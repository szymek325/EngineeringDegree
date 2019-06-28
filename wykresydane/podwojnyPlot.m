subplot(2,1,1)
plot(czas2,t)
%title('kp=250 ki=50 kd=60')
hold on
subplot(2,1,1)
plot(czas2,s)
hold on
%grid on
%grid minor
axis([-inf-0.2 inf+0.2 -inf inf])
ylabel('temperatura[C]')
legend('pomiar temperatury','temperatura zadana')
subplot(2,1,2)
plot(czas2,p)
hold on
axis([0 inf -260 260])
xlabel('czas[min]')
ylabel('sygna³ PWM')

legend('sygna³ steruj¹cy')